import React, { useState, createContext, ReactNode } from "react";
import {Image} from "../components/Props/MainProp";

interface PageProps {
    prompt: string;
    generatedScript: string;
    script: string;
    images: Image[];
    audios: string[];
    videoURL: string
  }
interface ContextProps {
  items: PageProps;
  setItems: React.Dispatch<React.SetStateAction<PageProps>>;
}

const defaultProp: PageProps = {
    prompt: '',
    script: '',
    generatedScript: "",
    images: [],
    audios: [],
    videoURL: ""

}

export const Context = createContext<ContextProps>({
  items: defaultProp,
  setItems: (value) => {}
});



interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
const [items, setItems] = useState<PageProps>(defaultProp)


  return (
    <Context.Provider value= {{ items, setItems }}>
      {children}
    </Context.Provider>
  );
};
