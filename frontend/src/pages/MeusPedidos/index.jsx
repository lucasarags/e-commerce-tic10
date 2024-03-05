import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShowMeusPedidos from "../../components/ShowMeusPedidos";

export default function MeusPedidos() {
    return(
        <>
        <Header/>
        <div className="flex justify-center items-center">
        <ShowMeusPedidos />
        </div>
        <Footer/>
        </>
    )
    
}