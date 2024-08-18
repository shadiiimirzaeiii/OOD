import { ToastContainer as Toast } from 'react-toastify';
import { styled } from 'styled-components';
import { Breakpoints } from '@/theme/breakpoints';

export const ToastContainer = styled(Toast)`
  & .Toastify__toast-body {
    padding: unset;
    gap: 1rem;
  }

  & .Toastify__close-button {
    margin: -5px 0 0 -15px;
  }

  & .Toastify__toast-body > div:last-child {
    line-height: 28px;
    padding-left: 1rem;
    font-family: var(--dana-font) !important;
    font-size: 1rem;
    font-weight: 400;
    line-height: '28px';
    @media (min-width: ${Breakpoints.sm}) {
      & {
        line-height: normal;
      }
    }
  }

  & .Toastify__toast {
    min-height: fit-content;
    border-radius: 4px;
    margin-bottom: 1rem;
    padding: 12px 24px 18px 24px;
    width: 100%;

    @media (min-width: ${Breakpoints.md}) {
      min-width: 400px;
      width: max-content;
    }
  }

  & .Toastify__progress-bar--success {
    /* custom background */
  }

  & .Toastify__progress-bar--error {
    /* custom background */
  }

  & .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning {
    /* custom background */
  }

  & .Toastify__toast-icon {
    width: 26px;
    height: 24px;
  }
`;
