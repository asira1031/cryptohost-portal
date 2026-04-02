import "server-only";

type RawSftpItem = {
  name: string;
  type: string;
  size: number;
};

type SftpFileItem = {
  name: string;
  size: number;
  path: string;
};

export async function listUserSftpFiles(
  userId: string
): Promise<SftpFileItem[]> {
  const mod: any = await import("ssh2-sftp-client");
  const SftpClient = mod.default || mod;
  const sftp: any = new SftpClient();

  const host = process.env.SFTP_HOST;
  const port = Number(process.env.SFTP_PORT || 22);
  const username = process.env.SFTP_USERNAME;
  const password = process.env.SFTP_PASSWORD;
  const basePath = process.env.SFTP_BASE_PATH;

  if (!host || !username || !password || !basePath) {
    throw new Error("Missing SFTP environment variables.");
  }

  const userPath = `${basePath}/${userId}`;

  try {
    console.log("SFTP: connecting...", { host, port, userPath });

    await sftp.connect({
      host,
      port,
      username,
      password,
      readyTimeout: 5000,
      tryKeyboard: true,
      debug: (msg: any) => console.log("SFTP DEBUG:", msg),
    });

    console.log("SFTP: connected");

    const exists = await sftp.exists(userPath);
    console.log("SFTP: path exists result =", exists);

    if (!exists) {
      return [];
    }

    const items: RawSftpItem[] = await sftp.list(userPath);
    console.log("SFTP: listed items =", items.length);

    return items
      .filter((item: RawSftpItem) => item.type !== "d")
      .map((item: RawSftpItem) => ({
        name: item.name,
        size: item.size,
        path: `${userPath}/${item.name}`,
      }));
  } catch (error) {
    console.error("SFTP ERROR:", error);
    return [];
  } finally {
    try {
      await sftp.end();
    } catch {}
  }
}