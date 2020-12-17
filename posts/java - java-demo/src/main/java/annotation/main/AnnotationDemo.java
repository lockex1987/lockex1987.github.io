package annotation.main;

import java.lang.reflect.Field;

import annotation.anno.FirstAnno;
import annotation.anno.SecondAnno;
import annotation.model.MyModel;

public class AnnotationDemo {

    public static void main(String[] args) {
        System.out.println(analyzeClass(MyModel.class));
    }

    private static String analyzeClass(Class<?> cls) {
        StringBuilder sb = new StringBuilder();
        
        // Kiểm tra xem lớp có được đánh dấu không
        System.out.println("Marked with FirstAnno: " + cls.isAnnotationPresent(FirstAnno.class));
        System.out.println("Marked with SecondAnno: " + cls.isAnnotationPresent(SecondAnno.class));
        
        // Lấy ra các field có trong class
        Field[] fields = cls.getDeclaredFields();
        for (Field f : fields) {
            // Kiểm tra xem có được đánh dấu FirstAnno không
            if (f.isAnnotationPresent(FirstAnno.class)) {
                FirstAnno fa = f.getAnnotation(FirstAnno.class);
                String name = fa.name();
                long length = fa.length();
                
                sb.append("Name: " + name + " (" + length + ")\n");
            }
            
            // Kiểm tra xem có được đánh dấu SecondAnno không
            if (f.isAnnotationPresent(SecondAnno.class)) {
                SecondAnno sa = f.getAnnotation(SecondAnno.class);
                int id = sa.id();
                
                sb.append("ID: " + id + "\n");
            }
        }
        
        return sb.toString();
    }
}
