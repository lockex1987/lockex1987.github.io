package annotation.model;

import annotation.anno.FirstAnno;
import annotation.anno.SecondAnno;

@SecondAnno(id = 1)
public class MyModel {

    @FirstAnno(name = "Nobita", length = 100)
    private String firstName;
    
    @FirstAnno(name = "Salah")
    private String lastName;
    
    @SecondAnno(id = 2)
    private int id;
}
