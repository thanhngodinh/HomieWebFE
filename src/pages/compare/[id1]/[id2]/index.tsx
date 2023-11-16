import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../../../layouts/HeaderFooterLayout';
import Compare from '../../../../content/Compare/Compare';

const ComparePage: NextPage & { Layout?: FC } = () => {
  return <Compare />;
};

ComparePage.Layout = HeaderFooterLayout;

export default ComparePage;
