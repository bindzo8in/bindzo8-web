async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function Page() {
  await wait(5000);

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}