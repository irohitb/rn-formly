const child = require("child_process");
const fs = require("fs");
const output = child
  .execSync(`git log --format=%B%H----DELIMITER----`)
  .toString("utf-8");
// Gives Commit with SHA 
const commitsArray = output
  .split("----DELIMITER----\n")
  .map(commit => {
    const [message, sha] = commit.split("\n");

    return { sha, message };
  })
  .filter(commit => Boolean(commit.sha));
// Get Repo URL
const gitRepoUrl = child
.execSync("git config --get remote.origin.url")
.toString("utf-8").replace(".git", "").trim()
const currentChangelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
// Gettting Package JSON version for which we are creating logs
const currentVersion = parseFloat(require("./package.json").version);
let newChangelog = `# Version ${currentVersion} (${
  new Date().toISOString().split("T")[0]
})\n\n`;
const commits = {
  feature: [], 
  feat: [],
  chore: [],
  styles: [], 
  refactor: [], 
  breaking: [],  
  bug: [], 
  perf: [],
  removed: [],
  miscellaneous: []
}
commitsArray.forEach(commit => {
const commitHeaderArray = commit.message.match(/.*(?=:)/)
  if (commitHeaderArray) {
    let commitHeader = commitHeaderArray[0].toLowerCase()
    if (commits.hasOwnProperty(commitHeader)) {
      commits[commitHeader].push(`* ${commit.message.replace(`${commitHeaderArray[0]}:`, "")} ([${commit.sha.substring(
        0,
        6
      )}](${gitRepoUrl}/commit/${
        commit.sha
      }))\n`)
    } else {
      commits.miscellaneous.push(`* ${commit.message.replace(`${commitHeaderArray[0]}:`, "")} ([${commit.sha.substring(
        0,
        6
      )}](${gitRepoUrl}/commit/${
        commit.sha
      }))\n`)
    }
  } else {
    commits.miscellaneous.push(`* ${commit.message} ([${commit.sha.substring(
      0,
      6
    )}](${gitRepoUrl}/commit/${
      commit.sha
    }))\n`)
  }
})
for (let commitHeader in commits) {
  const commitsArray = commits[commitHeader]
  if (commitsArray.length) {
    newChangelog += `## ${commitHeader}\n`;
    commitsArray.forEach(commitMessage => {
      newChangelog += commitMessage;
    })
    newChangelog += '\n';
  }
}
// prepend the newChangelog to the current one
fs.writeFileSync("./CHANGELOG.md", `${newChangelog}${currentChangelog}`);