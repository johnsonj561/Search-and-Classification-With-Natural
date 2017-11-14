## The 4 Universities Data Set

[Original Data Set] contains 8,282 WWW pages collected from computer science departments in 1997. The pages were manually classified into the following categories.
1. student
2. faculty
3. staff
4. department
5. course
6. project
7. other

From this, a [simplified data set] was created. The simplified data set removed pages in department, staff, and other. Department and Staff classes had fewer samples than the other classes, and the Other class was removed due to high variance in document attributes. The [simplified data set] has been stemmed and split into training (2803 docs) and test (1396 docs) sets.

Simplified Data Set:
1. student
2. faculty
3. course
4. project

[Original Data Set]: http://www.cs.cmu.edu/afs/cs.cmu.edu/project/theo-20/www/data/
[Simplified Data Set]: http://csmining.org/index.php/webkb.html