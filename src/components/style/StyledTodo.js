import styled from "styled-components"
import tw from "twin.macro"


export const StyledButton = styled.button`
 ${props => props.prop === "done" ? tw`text-green-300`: ``}
`
export const StyledText = styled.p`
${props => props.prop === "done" ? tw`line-through text-3xl pt-5`: tw`text-3xl pt-5`}
`