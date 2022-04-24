type ChapterConfig = {
  doc: string;
  navName: string;
  id: string;
  theme: {
    primaryColor: string;
    primaryColorText: string;
  };
};

const chaptersConfig: { [name: string]: ChapterConfig } = {
  peabody: {
    doc: "1MpzjlvyBpGKY652umleryda7RiGrkromPjtV2eGDXOQ",
    navName: "The Work of Knowledge",
    id: "peabody",
    theme: {
      primaryColor: "#93E3BD",
      primaryColorText: "black",
    },
  },
  playfair: {
    doc: "1r_nPqLVD1yYufNxNRENTfUuTJA5Z5LzPTX6uOJhf8vI",
    id: "playfair",
    navName: "Visualization as Argument",
    theme: {
      primaryColor: "#3B6FE0",
      primaryColorText: "white",
    },
  },
  sandbox: {
    id: "sandbox",
    doc: "1ZnzdhstuleNMzjzl6EuJzD1SxAsj54bMOu-5IxeaRWo",
    navName: "Sandbox",
    theme: {
      primaryColor: "#93E3BD",
      primaryColorText: "black",
    },
  },
};

export default chaptersConfig;
