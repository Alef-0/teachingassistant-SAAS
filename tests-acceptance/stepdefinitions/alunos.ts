import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

// let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameCPF = ((elem, cpf) => elem.element(by.name('cpflist')).getText().then(text => text === cpf));
let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

async function createStudent(name, cpf){
    await $("input[name='namebox']").sendKeys(<string> name);
    await $("input[name='cpfbox']").sendKeys(<string> cpf);
    await element(by.className('criar')).click();
}

async function find(name, cpf, quantity){
    var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
    await allalunos;
    var samenamecpf = allalunos.filter(elem => sameCPF(elem,cpf) && sameName(elem,name));
    await samenamecpf;
    await samenamecpf.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(quantity));
}


defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the students page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TaGui');
        await $("a[name='alunos']").click();
    })

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        await allcpfs;
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs;
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    Given(/^I can see a student with name "([^\"]*)" and CPF "(\d*)" in the students list$/, async (name, cpf) => {
        await createStudent(name,cpf);
        await find(name,cpf, 1);
    });

    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
        await createStudent(name,cpf)
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        await find(name,cpf, 1);
    });

    When(/^I select the remove button on the student with name "([^\"]*)" and CPF "(\d*)" in the students list$/, async (name,cpf) =>{
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await allalunos;
        await allalunos.filter(elem => 
            sameCPF(elem,cpf)
        ).first().element(by.className('excluir')).click();
    })

    Then(/^I shouldn't see "([^\"]*)" and CPF "(\d*)" in the students list$/, async(name,cpf)=>{
        await find(name,cpf,0);
    })
})
