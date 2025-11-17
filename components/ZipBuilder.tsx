import JSZip from "jszip";

interface ZipBuilderInputs {
  configYaml: string;
  workflowYaml: string;
}

export default async function ZipBuilder(
  configYaml: ZipBuilderInputs["configYaml"],
  workflowYaml: ZipBuilderInputs["workflowYaml"]
): Promise<Blob> {
  const zip: JSZip = new JSZip();

  zip.file(".branchbouncer.yml", configYaml);
  zip.file(".github/workflows/branchbouncer.yml", workflowYaml);

  const blob: Blob = await zip.generateAsync({ type: "blob" });
  return blob;
}
