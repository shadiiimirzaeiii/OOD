import { styled } from 'styled-components';

export const BottomSheetContainer = styled.div`
  .bs_layer {
    position: fixed;
    inset: 0;
    z-index: 10000;
  }

  .bs_box-inner {
    position: absolute;
    bottom: 0;
    border-radius: 16px 16px 0 0;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: auto;
    max-height: 60vh;
  }

  .bs_header {
    padding: 10px;
    position: sticky;
    inset-inline: 0;
    top: 0;
    z-index: 1;
    background: inherit;
  }

  .bs_header::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scaleY(0.75);
    border-radius: 80px;
    width: 50%;
    height: 4px;
    background-color: grey;
  }
`;
