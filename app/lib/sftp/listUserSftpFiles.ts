import SftpClient from "ssh2-sftp-client";

type RawSftpItem = {
  name: string;
  type: string;
  size: number;
};

export type SftpFileItem = {
  name: string;
  size: number;
  path: string;
};

function getUserUploadDir(userId: string) {
  const base = process.env.SFTP_UPLOAD_BASE_DIR || "/upload";
  return `${base}/${userId}`;
}

export async function listUserSftpFiles(
  userId: string
): Promise<SftpFileItem[]> {
  const sftp = new SftpClient();

  const host = process.env.SFTP_HOST;
  const port = Number(process.env.SFTP_PORT || 22);
  const username = process.env.SFTP_USERNAME;
  const password = process.env.SFTP_PASSWORD;

  if (!host || !username || !password) {
    throw new Error("Missing SFTP environment variables.");
  }

  const remoteDir = getUserUploadDir(userId);

  try {
    await sftp.connect({
      host,
      port,
      username,
      password,

      readyTimeout: 30000,
      retries: 1,
      retry_factor: 2,
      retry_minTimeout: 2000,
      keepaliveInterval: 10000,
      keepaliveCountMax: 3,
      strictVendor: false,
      promiseLimit: 1,

      algorithms: {
        kex: [
          "curve25519-sha256",
          "curve25519-sha256@libssh.org",
          "ecdh-sha2-nistp256",
          "ecdh-sha2-nistp384",
          "ecdh-sha2-nistp521",
          "diffie-hellman-group-exchange-sha256",
          "diffie-hellman-group14-sha256",
          "diffie-hellman-group14-sha1",
        ],
        cipher: [
          "aes128-ctr",
          "aes192-ctr",
          "aes256-ctr",
          "aes128-gcm",
          "aes256-gcm",
        ],
        serverHostKey: [
          "ssh-ed25519",
          "ecdsa-sha2-nistp256",
          "ecdsa-sha2-nistp384",
          "ecdsa-sha2-nistp521",
          "rsa-sha2-512",
          "rsa-sha2-256",
          "ssh-rsa",
        ],
        hmac: [
          "hmac-sha2-256",
          "hmac-sha2-512",
          "hmac-sha1",
        ],
      },

      debug:
        process.env.SFTP_DEBUG === "true"
          ? (msg: string) => console.log("[SFTP]", msg)
          : undefined,
    });

    const exists = await sftp.exists(remoteDir);

    if (!exists) {
      return [];
    }

    const items = (await sftp.list(remoteDir)) as RawSftpItem[];

    return items
      .filter((item) => item.type !== "d")
      .map((item) => ({
        name: item.name,
        size: item.size || 0,
        path: `${remoteDir}/${item.name}`,
      }));
  } catch (error: any) {
    console.error("listUserSftpFiles error:", error?.message || error);
    throw error;
  } finally {
    try {
      await sftp.end();
    } catch {
      // ignore close error
    }
  }
}