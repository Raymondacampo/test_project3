import Head from '@/components/Head';
import Footer from '@/components/Footer';
import MainContent from '@/components/Index/MainContent';

// export async function getServerSideProps() {
//   const res = await fetch("127.0.0.1:8000/api/data/");
//   const data = await res.json();
//   return { props: { data } };
// }

export default function Home({ data }) {
  return (
    <div class="w-full h-[3175px] relative bg-white  overflow-hidden">
        <MainContent />
    </div>
  );
}   
