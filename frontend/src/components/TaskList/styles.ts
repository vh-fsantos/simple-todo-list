import styled from "styled-components";

export const TaskListContainer = styled.div`
  height: calc(100vh - 20px);
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #efefef;
  border-radius: 5px;
  margin: 10px 0px;
`;
export const LoadingContainer = styled.div`
  span {
    width: 40px;
    height: 40px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: calc(50% - 61px);
    right: calc(50% - 20px);
  }
`;

export const NoTaskRegisteredMessage = styled.p`
  position: absolute;
  transform: translate(-50%, -50%);
  left: calc(50% - 20px);
  top: calc(50% - 61px);
  width: 100%;
  text-align: center;
  text-decoration: underline;
  font-size: 18px;
`;
