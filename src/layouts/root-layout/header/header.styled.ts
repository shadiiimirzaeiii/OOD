import styled from 'styled-components';

export const Select = styled.span<{ $isCurrent: boolean }>`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${props => (props.$isCurrent ? '#FFF3D0' : '#FCFCFC')};
  color: ${props => (props.$isCurrent ? '#915930' : '#646464')};
  text-decoration: none;

  &:hover {
    color: #915930;
    background-color: #fff3d0;
  }
`;
