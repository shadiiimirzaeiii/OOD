import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import styled from 'styled-components';

export const StyledAccordionItem = styled(Accordion.Item)`
  overflow: hidden;

  h3 {
    margin: 0;
  }

  button {
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

export const StyledHeader = styled(Accordion.Header)`
  display: flex;
  width: 100%;
`;

export const StyledTrigger = styled(Accordion.Trigger)`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;

  &:hover {
    background-color: #fff3d0;
    cursor: pointer;
  }

  &[data-state='open'] > .AccordionChevron {
    transform: rotate(180deg);
  }
`;

export const StyledContent = styled(Accordion.Content)`
  overflow: hidden;

  &[data-state='open'] {
    animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state='closed'] {
    animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

export const StyledAccordionChevron = styled(ChevronDownIcon)`
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
`;

export const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 8px 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledLink = styled(Link)<{ $isCurrent: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => (props.$isCurrent ? '#915930' : '#646464')};
  background-color: ${props => (props.$isCurrent ? '#FFF3D0' : '#FCFCFC')};

  &:hover {
    background-color: #fff3d0;
  }

  svg {
    path {
      fill: ${props => (props.$isCurrent ? '#915930' : '#646464')};
    }
  }
`;
