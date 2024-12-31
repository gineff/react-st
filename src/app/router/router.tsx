import { ActionsPage } from '@/pages/actions/actionsPage';
import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter: FC = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Navigate to="/actions" replace />} />
      <Route path="actions" element={<ActionsPage />} />
    </Route>
  </Routes>
);
