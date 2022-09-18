Feature: As a professor
         I want to register students
         So that I can manage their learning goals

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "683" in the students list
When I try to register the student "Paulo" with CPF "683"
Then I can see "Paulo" with CPF "683" in the students list

Scenario: Removing Student from list
Given I am at the students page
Given I can see a student with name "Mari" and CPF "321" in the students list
When I select the remove button on the student with name "Mari" and CPF "321" in the students list
Then I shouldn't see "Mari" and CPF "321" in the students list