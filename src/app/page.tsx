import { Modal } from "@/components";
import { MyContextProvider } from "@/Contexts/MyContext";
import { SearchInput } from "@/components/molecules/Search";
export default function Home() {
  return (
    <>
      <MyContextProvider>
        <div className="mb-20">
          <SearchInput></SearchInput>
          <Modal></Modal>
        </div>
      </MyContextProvider>
    </>
  );
}
