'use strict';
var Generator   = require('yeoman-generator');
var chalk       = require('chalk');
var fs          = require('fs');

module.exports = Generator.extend({
    prompting: function() {
        var f = process.cwd().split("/");
        var cwd = f[f.length - 1];

        var done = this.async();
        this.context = {},
        this.context.author = process.env.LOGNAME || "Yeoman";
        this.context.cwd = cwd;

        this.log(chalk.green('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'));

        this.log(chalk.red('#                                                                                                                                   '));
        this.log(chalk.red('#                                                                                                                                   '));
        this.log(chalk.red('#  MMMMMMMM               MMMMMMMM 222222222222222       SSSSSSSSSSSSSSS         CCCCCCCCCCCCC   SSSSSSSSSSSSSSS    SSSSSSSSSSSSSSS '));
        this.log(chalk.red('#  M:::::::M             M:::::::M2:::::::::::::::22   SS:::::::::::::::S     CCC::::::::::::C SS:::::::::::::::S SS:::::::::::::::S'));
        this.log(chalk.red('#  M::::::::M           M::::::::M2::::::222222:::::2 S:::::SSSSSS::::::S   CC:::::::::::::::CS:::::SSSSSS::::::SS:::::SSSSSS::::::S'));
        this.log(chalk.red('#  M:::::::::M         M:::::::::M2222222     2:::::2 S:::::S     SSSSSSS  C:::::CCCCCCCC::::CS:::::S     SSSSSSSS:::::S     SSSSSSS'));
        this.log(chalk.red('#  M::::::::::M       M::::::::::M            2:::::2 S:::::S             C:::::C       CCCCCCS:::::S            S:::::S            '));
        this.log(chalk.red('#  M:::::::::::M     M:::::::::::M            2:::::2 S:::::S            C:::::C              S:::::S            S:::::S            '));
        this.log(chalk.red('#  M:::::::M::::M   M::::M:::::::M         2222::::2   S::::SSSS         C:::::C               S::::SSSS          S::::SSSS         '));
        this.log(chalk.red('#  M::::::M M::::M M::::M M::::::M    22222::::::22     SS::::::SSSSS    C:::::C                SS::::::SSSSS      SS::::::SSSSS    '));
        this.log(chalk.red('#  M::::::M  M::::M::::M  M::::::M  22::::::::222         SSS::::::::SS  C:::::C                  SSS::::::::SS      SSS::::::::SS  '));
        this.log(chalk.red('#  M::::::M   M:::::::M   M::::::M 2:::::22222               SSSSSS::::S C:::::C                     SSSSSS::::S        SSSSSS::::S '));
        this.log(chalk.red('#  M::::::M    M:::::M    M::::::M2:::::2                         S:::::SC:::::C                          S:::::S            S:::::S'));
        this.log(chalk.red('#  M::::::M     MMMMM     M::::::M2:::::2                         S:::::S C:::::C       CCCCCC            S:::::S            S:::::S'));
        this.log(chalk.red('#  M::::::M               M::::::M2:::::2       222222SSSSSSS     S:::::S  C:::::CCCCCCCC::::CSSSSSSS     S:::::SSSSSSSS     S:::::S'));
        this.log(chalk.red('#  M::::::M               M::::::M2::::::2222222:::::2S::::::SSSSSS:::::S   CC:::::::::::::::CS::::::SSSSSS:::::SS::::::SSSSSS:::::S'));
        this.log(chalk.red('#  M::::::M               M::::::M2::::::::::::::::::2S:::::::::::::::SS      CCC::::::::::::CS:::::::::::::::SS S:::::::::::::::SS '));
        this.log(chalk.red('#  MMMMMMMM               MMMMMMMM22222222222222222222 SSSSSSSSSSSSSSS           CCCCCCCCCCCCC SSSSSSSSSSSSSSS    SSSSSSSSSSSSSSS   '));
        this.log(chalk.red('#                                                                                                                                   '));
        this.log(chalk.red('#                                                                                                                                   '));

        var prompts = [
        	{
                type: 'input',
                name: 'theme_name',
                message: 'Theme Name: ',
                default: cwd
            },
            {
                type: 'input',
                name: 'output',
                message: 'Output File Name: (eg: mytheme)',
                default: cwd
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author: ',
                default: this.context.author
            },
            {
                type: 'input',
                name: 'description',
                message: 'Description: ',
                default: "Generated with Yeoman by " + this.context.author
            },
            {
                type: 'input',
                name: 'version',
                message: 'Version: ',
                default: "1.0.0"
            }

        ];


		return this.prompt(prompts).then(function(props) {
            
            this.context.theme_name 	= props.theme_name;
            this.context.output 		= props.output;
            this.context.author 		= props.author;
            this.context.description 	= props.description;
            this.context.version 		= props.version;
            
            done();
        }.bind(this));
    },
    writing: {
        structure: function() {
            this.log("web/scss/" + this.context.output + ".scss");
            fs.access("web/scss/" + this.context.output + ".scss", fs.F_OK, (err) => {
                if (err) {
                    this.fs.copyTpl(
                        this.templatePath('web/scss/custom.scss'),
                        this.destinationPath('web/scss/'+ this.context.output + '.scss'), {
                            context: this.context
                        }
                    );
                    return
                }
                this.log('exists');
                //file exists
            });

            // Generate gulpfile.js
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath('gulpfile.js'), {
                    context: this.context
                }
            );

            // Generate package.json
            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'), {
                    context: this.context
                }
            );
        }
    }
});