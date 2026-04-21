import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const Root = () => {
    return (
        <>
            <ScrollToTop />
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Root;
