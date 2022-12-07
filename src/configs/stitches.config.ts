import { createStitches } from "@stitches/react";

export const { 
  styled, 
  getCssText, 
  createTheme, 
  globalCss 
} = createStitches({ 
  theme: {
    /* ... other tokens */
    colors: {
      text: "black",
      background: "white",
    }
  }
 });

 export const darkTheme = createTheme({ 
    colors: { 
      text: "white",
      background: "black"
    } 
  });