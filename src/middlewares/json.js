export async function json(req, res) {
  const req_buffer = [];

  for await (const buffer of req) {
    req_buffer.push(buffer);
  }

  req.body =
    req_buffer.length != 0
      ? JSON.parse(Buffer.concat(req_buffer).toString())
      : null;
}
