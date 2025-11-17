"use client";

import { useState } from "react";
import YamlGenerator from "@/components/YamlGenerator";
import ZipBuilder from "@/components/ZipBuilder";
import DownloadButton from "@/components/DownloadButton";

export default function BranchBouncerPage() {
  const [rules, setRules] = useState({
    accountAge: true,
    prChanges: true,
    repoCount: false,
    protectedPaths: false
  });

  const [values, setValues] = useState({
    accountAgeDays: 730,
    minChanges: 500,
    minRepos: 3,
    blockedPaths: "package.json, .github/workflows/"
  });

  const [zipBlob, setZipBlob] = useState<Blob | null>(null);

  function toggleRule(rule: keyof typeof rules) {
    setRules(prev => ({ ...prev, [rule]: !prev[rule] }));
  }

  function updateValue(key: keyof typeof values, value: string | number) {
    setValues(prev => ({ ...prev, [key]: value }));
  }

  async function generateZip() {
    const { configYaml, workflowYaml } = YamlGenerator(rules, values);
    const blob = await ZipBuilder(configYaml, workflowYaml);
    setZipBlob(blob);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>BranchBouncer GUI</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={rules.accountAge} onChange={() => toggleRule("accountAge")} />
          <span>Account age &gt;</span>
          <input 
            type="number" 
            value={values.accountAgeDays} 
            onChange={(e) => updateValue("accountAgeDays", Number(e.target.value))}
            disabled={!rules.accountAge}
            style={{ width: 80, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <span>days (≈ {Math.round(values.accountAgeDays / 365)} years)</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={rules.prChanges} onChange={() => toggleRule("prChanges")} />
          <span>PR must have &gt;</span>
          <input 
            type="number" 
            value={values.minChanges} 
            onChange={(e) => updateValue("minChanges", Number(e.target.value))}
            disabled={!rules.prChanges}
            style={{ width: 80, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <span>changes</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={rules.repoCount} onChange={() => toggleRule("repoCount")} />
          <span>Contributor must have &gt;</span>
          <input 
            type="number" 
            value={values.minRepos} 
            onChange={(e) => updateValue("minRepos", Number(e.target.value))}
            disabled={!rules.repoCount}
            style={{ width: 80, padding: "4px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <span>public repos</span>
        </label>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <input type="checkbox" checked={rules.protectedPaths} onChange={() => toggleRule("protectedPaths")} style={{ marginTop: 8 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span>Block protected paths (comma-separated):</span>
            <input 
              type="text" 
              value={values.blockedPaths} 
              onChange={(e) => updateValue("blockedPaths", e.target.value)}
              disabled={!rules.protectedPaths}
              placeholder="e.g., package.json, .github/workflows/"
              style={{ padding: "6px 10px", borderRadius: 4, border: "1px solid #ccc", width: "100%", maxWidth: 500 }}
            />
          </div>
        </label>
      </div>

      <button
        onClick={generateZip}
        style={{
          marginTop: 30,
          background: "black",
          color: "white",
          padding: "12px 20px",
          borderRadius: 6
        }}
      >
        Generate ZIP
      </button>

      {zipBlob && <DownloadButton blob={zipBlob} />}
    </div>
  );
}
