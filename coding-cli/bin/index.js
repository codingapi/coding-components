#!/usr/bin/env node
const { program } = require('commander');
const packageInfo = require("../package.json");
const fs = require("fs");
const cwd = process.cwd();
const path = require("path");
const download = require("download-git-repo");
const inquirer = require("inquirer");
const axios = require('axios');

// Function to fetch tags from GitHub repo
async function fetchTags() {
    try {
        const response = await axios.get('https://api.github.com/repos/codingapi/springboot-example/tags');
        return response.data.map(tag => tag.name);
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}

const downloadRep = (projectName, targetDirectory, tagName) => {
    download(`github:codingapi/springboot-example#${tagName}`, targetDirectory, { clone: true }, (err) => {
        if (!err) {
            console.log(`\r\n${projectName} project has been created successfully with version ${tagName}`);
        } else {
            console.error("Error downloading repository:", err);
        }
    });
}

const create = async (projectName, cmd) => {
    const tags = await fetchTags();
    const { version } = await inquirer.prompt([
        {
            name: 'version',
            type: 'list',
            message: '选择一个版本下载:',
            choices: tags,
        },
    ]);

    const targetDirectory = path.join(cwd, projectName);
    if (fs.existsSync(targetDirectory)) {
        if (cmd.force) {
            console.log(`\r\nRemoving...`);
            fs.rmSync(targetDirectory, { recursive: true, force: true });
            downloadRep(projectName, targetDirectory, version);
        } else {
            const { action } = await inquirer.prompt([
                {
                    name: "action",
                    type: "list",
                    message: "当前文件夹已存在，请选择一个操作：",
                    choices: [
                        {
                            name: "覆盖",
                            value: "overwrite",
                        },
                        {
                            name: "取消",
                            value: false,
                        },
                    ],
                },
            ]);
            if (!action) {
                return;
            } else if (action === "overwrite") {
                console.log(`\r\nRemoving...`);
                fs.rmSync(targetDirectory, { recursive: true, force: true });
                downloadRep(projectName, targetDirectory, version);
            }
        }
    } else {
        console.log(`\r\nCreating...`);
        downloadRep(projectName, targetDirectory, version);
    }
}

program
    .name("coding-cli")
    .usage(`<command> [option]`)
    .version(`coding-cli ${packageInfo.version}`);

program
    .command("create <project-name>")
    .description("创建新项目")
    .option("-f, --force", "强制覆盖")
    .action(async (projectName, cmd) => {
        console.log("Creating project:", projectName);
        await create(projectName, cmd);
    });

program.parse(process.argv);
