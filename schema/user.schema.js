import { type } from "arktype";
export const userSchema = type({
    /** the full name */
    name: "string = 'Jane Doe'",
    /** a valid email
     * @see https://github.com/arktypeio/arktype/blob/bad4e42477ee16d963220a8d8aa6923931502797/ark/type/keywords/string.ts#L374
     */
    email: "string.email",
    /** age of the user on signup - should be at least 18 for now  */
    age: "number >= 18",
});
