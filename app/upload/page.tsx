export default function UploadPage() {
  const subscriptionPaid = false;

  if (!subscriptionPaid) {
    return (
      <div className="min-h-screen bg-[#061225] text-white p-10">
        <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-4xl font-bold mb-4">Upload File</h1>
          <p className="text-white/70 mb-6">
            File upload is locked until your subscription payment is confirmed.
          </p>
          <a
            href="/subscribe"
            className="inline-block rounded-xl bg-yellow-400 text-black font-semibold px-6 py-3"
          >
            Go to Subscription
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#061225] text-white p-10">
      <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-4xl font-bold mb-4">Upload File</h1>
        <p className="text-white/70 mb-6">Upload your file for processing.</p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Reference Name"
            className="w-full rounded-xl bg-[#0b1b35] border border-white/10 px-4 py-3"
          />
          <input
            type="file"
            className="w-full rounded-xl bg-[#0b1b35] border border-white/10 px-4 py-3"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-yellow-400 text-black font-semibold py-3"
          >
            Submit File
          </button>
        </form>
      </div>
    </div>
  );
}