import React from 'react';
import { render,screen } from '@testing-library/react';
import App from './App';

test('Appコンポーネントが正しくレンダリングされること', () => {
  // コンポーネントをレンダリング
  render(<App />);
  
  // レンダリングされたコンポーネント内に指定のテキストが存在するか確認
  const text = screen.getByText('Reactでテストチュートリアル');
  expect(text).toBeInTheDocument();
});




