import { Header } from "../(marketing)/header";

type Props = {
  children: React.ReactNode;
};

const TeacherLayout = ({ children }: Props) => {
  return (
    <div className="m-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex flex-col flex-1 flex-grow items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default TeacherLayout;
