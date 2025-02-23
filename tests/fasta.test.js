const path = require("path"),
  fs = require("fs");

import fastaParser, {
  fastaToText,
  fnaParser,
  fnaToText
} from "./../lib/helpers/fasta";

const internalFastaDataStructure = [
    { header: "Seq1", seq: "ATCGTAATTGCA" },
    { header: "Seq2", seq: "CTCGTAATGGCC" },
    { header: "Seq3", seq: "GTCGTCAATGCT" }
  ],
  simple_fasta_path = path.resolve(
    __dirname,
    "..",
    "dist",
    "data",
    "Simple.fasta"
  ),
  simple_fna_path = path.resolve(__dirname, "..", "dist", "data", "Simple.fna"),
  fasta = fs.readFileSync(simple_fasta_path).toString(),
  fna = fs.readFileSync(simple_fna_path).toString();
internalFastaDataStructure.number_of_sequences = 3;
internalFastaDataStructure.number_of_sites = 12;

test("Imports simple fasta correctly.", () => {
  const parsedFasta = fastaParser(fasta);
  expect(parsedFasta).toEqual(internalFastaDataStructure);
});

test.only("Import simple fna correctly.", () => {
  const newick = "((Seq1,Seq2),Seq3)",
    parsed_fna = fnaParser(fna);
  expect(parsed_fna.sequence_data).toEqual(internalFastaDataStructure);
  expect(parsed_fna.tree.newick_string).toEqual(newick);
});
