import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`
