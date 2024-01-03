import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

interface HeaderFooterLayoutProps {
  children?: ReactNode;
}

const HeaderFooterLayout: FC<HeaderFooterLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

HeaderFooterLayout.propTypes = {
  children: PropTypes.node as any,
};

export default HeaderFooterLayout;
