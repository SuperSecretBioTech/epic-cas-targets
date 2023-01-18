import { TableData } from "../components/Table";

export const generateMockTableData = (count: number): TableData[] => {
  const mockData = [];
  for (let i = 0; i < count; i++) {
    const mockObj = {
      Rank: i,
      "Target sequence": randomDNASequence(20),
      "Genomic location": randomGenomicLocation(),
      Strand: randomStrand(),
      "GC content (%)": generateRandomNumber(0, 100),
      "Self-complementarity": generateRandomNumber(0, 10),
      Efficiency: generateRandomNumber(0, 100),
    };
    mockData.push(mockObj);
  }
  return mockData;
};

function randomDNASequence(count: number) {
  const bases = ["A", "T", "C", "G"];
  let sequence = "";
  for (let i = 0; i < count; i++) {
    sequence += bases[Math.floor(Math.random() * 4)];
  }
  return sequence;
}

function randomGenomicLocation() {
  const chromosomes = [
    "chr1",
    "chr2",
    "chr3",
    "chr4",
    "chr5",
    "chr6",
    "chr7",
    "chr8",
    "chr9",
    "chr10",
    "chr11",
    "chr12",
    "chr13",
    "chr14",
    "chr15",
    "chr16",
    "chr17",
    "chr18",
    "chr19",
    "chr20",
    "chr21",
    "chr22",
    "chrX",
    "chrY",
  ];
  const chromosome = chromosomes[Math.floor(Math.random() * 24)];
  const location = Math.floor(Math.random() * 1000000000);
  return `${chromosome}:${location}`;
}

function randomStrand() {
  const strands = ["+", "-"];
  return strands[Math.floor(Math.random() * 2)];
}

function generateRandomNumber(start: number, end: number) {
  return Math.floor(Math.random() * (end - start) + start);
}
