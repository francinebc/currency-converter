import React from 'react';
import { render, screen } from '@testing-library/react';
import ConverterFrame from '../../components/ConverterFrame';

// todo: add more tests
test('app name is in the document', () => {
    render(<ConverterFrame/>);
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
});
