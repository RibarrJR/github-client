export function UserProfileForm({
 action,
}: {
  action: (e: FormData) => Promise<void>;
}) {
  return (
    <form action={action}>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  );
}
