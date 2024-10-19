// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   };
//   phone: string;
//   website: string;
//   company: {
//     name: string;
//     catchPhrase: string;
//     bs: string;
//   };
// };

export const UserCard: React.FC = () => {
  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-semibold text-slate-600">User Card</h1>
    </div>
  );
};
