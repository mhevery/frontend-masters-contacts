import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "../fake-db";
import CSS from "./index.css?inline";

export const onGet: RequestHandler<Contact> = async (ctx) => {
  return CONTACTS.filter((c) => c.id === ctx.params.contactId)[0];
};

export default component$(() => {
  useStylesScoped$(CSS);
  const endpoint = useEndpoint<typeof onGet>();
  return (
    <Resource
      value={endpoint}
      onPending={() => <>loading...</>}
      onResolved={(c) => (
        <div class="contact">
          [<a href={`/contacts/${c.id}/edit/`}>edit</a>]
          <div class="row">
            <img class="avatar" src={c.avatar} />
            <span>{c.name}</span>
          </div>
          <div class="row">
            <img
              class="icon"
              src="https://abs.twimg.com/favicons/twitter.2.ico"
            />
            <a href={c.twitter}>{last(c.twitter)}</a>
          </div>
          <div class="row">
            <img
              class="icon"
              src="https://github.githubassets.com/favicons/favicon.png"
            />
            <a href={c.github}>{last(c.github)}</a>
          </div>
          <div class="row">
            <img
              class="icon"
              src="https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"
            />
            <a href={c.linkedin}>{last(c.linkedin)}</a>
          </div>
        </div>
      )}
    />
  );
});

export function last<T extends string | undefined>(text: T): T {
  if (text === undefined) {
    return text;
  } else {
    const parts = text.split("/");
    let part: string;
    do {
      part = parts.pop()!;
    } while (parts.length && !part);
    return part as T;
  }
}
