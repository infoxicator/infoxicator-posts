import React from 'react';
import { shallow } from 'enzyme';
import InfoxicatorPosts from '../../src/components/InfoxicatorPosts';

describe('InfoxicatorPosts should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedModule = shallow(<InfoxicatorPosts />);
    expect(renderedModule.find('div')).toMatchSnapshot();
  });
});
