import styled from "styled-components";

interface Props {
  status: boolean;
}

export const Status = styled.div<Props>`
  display: inline-flex;
  background: ${(props) => (props.status === true ? "#E3FCEF" : "#DFE1E6")};
  color: ${(props) => (props.status === true ? "#006644" : "#42526E")};
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
  padding: 2px 4px;
  border-radius: 4px;
  margin-bottom: 4px;
`;

export const DueDate = styled.span`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: block;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 5px 0px;
  margin-bottom: 5px;
  /* display: inline-flex; */
  font-weight: bold;
  color: #0052cc;
  letter-spacing: -0.2px;
`;

export const Description = styled.span`
  font-size: 14px;
  margin: 0px;
  display: block;
  word-wrap: break-word;
`;

export const Title = styled.p`
  font-size: 15px;
  margin: 0px;
  word-wrap: break-word;
`;
