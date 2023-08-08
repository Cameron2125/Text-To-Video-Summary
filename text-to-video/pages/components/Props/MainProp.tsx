

export interface Image {
    id: number;
    imageUrl: string;
    description: string;
  }


interface PageProps {
    prompt: string;
    script: string;
    images: Image[];
  }
  
export default PageProps;