import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = () => {
  console.log("On the server");
};

export default component$(() => {
  return (
    <div>
      <h1>Contacts</h1>
      <p>Here are some contacts.</p>
    </div>
  );
});
