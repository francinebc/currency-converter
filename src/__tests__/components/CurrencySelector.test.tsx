import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrencySelector from '../../components/CurrencySelector';

// todo: add more tests
test('label is in the document', () => {
    render(<CurrencySelector label="TestLabel" handleChange={(currency: string | null | void) => {}} />);
    expect(screen.getAllByText('TestLabel')[0]).toBeInTheDocument();
});
