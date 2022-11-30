import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "../../fake-db";
import CSS from "./index.css?inline";

interface ContactForm {
  contact: Contact;
  errors: { [P in keyof Contact]?: string };
}

export const onGet: RequestHandler<ContactForm> = async (ctx) => {
  return {
    contact: CONTACTS.filter((c) => c.id === ctx.params.contactId)[0],
    errors: {},
  };
};

export const onPost: RequestHandler<ContactForm> = async ({
  request,
  response,
}) => {
  const formData = await request.formData();
  const contact: Contact = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    avatar: formData.get("avatar") as string,
    twitter: formData.get("twitter") as string,
    github: formData.get("github") as string,
    linkedin: formData.get("linkedin") as string,
  };
  const data = {
    contact: contact,
    errors: {},
  };
  const hasErrors = isRequired(contact, "name", data.errors);
  if (!hasErrors) {
    // save contact to DB;
    const existingContact = CONTACTS.find((c) => c.id === contact.id);
    existingContact && Object.assign(existingContact, contact);
    throw response.redirect("/contacts/" + contact.id + "/");
  }
  return data;
};

function isRequired(
  contact: Contact,
  field: keyof Contact,
  errors: Record<string, string>
) {
  if (!contact[field]) {
    errors[field] = "The '" + field + "' is required";
    console.log("errors", field);
    return true;
  }
  return false;
}

export default component$(() => {
  useStylesScoped$(CSS);
  const endpoint = useEndpoint<typeof onGet>();
  return (
    <Resource
      value={endpoint}
      onPending={() => <>loading...</>}
      onResolved={(data) => {
        const c = data.contact;
        const errors = data.errors;
        return (
          <form method="POST">
            <input type="hidden" name="id" value={c.id} />
            <input type="hidden" name="avatar" value={c.avatar} />
            <div class="contact">
              [<a href={`/contacts/${c.id}/`}>cancel</a>]
              <div class="row">
                <img class="avatar" src={c.avatar} />
                <input name="name" value={c.name} />
                {errors.name && <span class="error">{errors.name}</span>}
              </div>
              <div class="row">
                <img
                  class="icon"
                  src="https://abs.twimg.com/favicons/twitter.2.ico"
                />
                <input name="twitter" value={c.twitter} />
              </div>
              <div class="row">
                <img
                  class="icon"
                  src="https://github.githubassets.com/favicons/favicon.png"
                />
                <input name="github" value={c.github} />
              </div>
              <div class="row">
                <img
                  class="icon"
                  src="https://static-exp1.licdn.com/scds/common/u/images/logos/favicons/v1/favicon.ico"
                />
                <input name="linkedin" value={c.linkedin} />
              </div>
            </div>
            <button>Save</button>
          </form>
        );
      }}
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
