import yaml from "js-yaml";

interface Rules {
  accountAge?: boolean;
  prChanges?: boolean;
  repoCount?: boolean;
  protectedPaths?: boolean;
}

interface Values {
  accountAgeDays: number;
  minChanges: number;
  minRepos: number;
  blockedPaths: string;
}

interface AccountAgeRule {
  id: "account-age-min";
  minAccountAgeDays: number;
}
interface PrChangesRule {
  id: "pr-total-changes-min";
  minTotalChanges: number;
}
interface RepoCountRule {
  id: "public-repo-min";
  minRepos: number;
}
interface ProtectedPathsRule {
  id: "protected-paths";
  blockedPaths: string[];
}

type RuleEntry = AccountAgeRule | PrChangesRule | RepoCountRule | ProtectedPathsRule;

interface BranchBouncerConfig {
  rules: RuleEntry[];
}

interface GeneratedYaml {
  configYaml: string;
  workflowYaml: string;
}

export default function YamlGenerator(rules: Rules, values: Values): GeneratedYaml {
  const blockedPathsArray = values.blockedPaths
    .split(',')
    .map(path => path.trim())
    .filter(path => path.length > 0);

  const config: BranchBouncerConfig = {
    rules: [
      rules.accountAge && { id: "account-age-min", minAccountAgeDays: values.accountAgeDays },
      rules.prChanges && { id: "pr-total-changes-min", minTotalChanges: values.minChanges },
      rules.repoCount && { id: "public-repo-min", minRepos: values.minRepos },
      rules.protectedPaths && { id: "protected-paths", blockedPaths: blockedPathsArray }
    ].filter(Boolean) as RuleEntry[]
  };

  const configYaml: string = yaml.dump(config);

  const workflowYaml = `
name: BranchBouncer

permissions:
  contents: read
  pull-requests: read
  checks: write

on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  validate-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run BranchBouncer
        uses: SidhantCodes/branchbouncer@v1
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          config_path: ".branchbouncer.yml"
`;

  return { configYaml, workflowYaml };
}
