import { component$ } from "@builder.io/qwik";

export const onGet: RequestHandler = () => {};

export default component$(() => {
  return (
    <div>
      <h1>Contacts</h1>
      <p>Here are some contacts.</p>
    </div>
  );
});
