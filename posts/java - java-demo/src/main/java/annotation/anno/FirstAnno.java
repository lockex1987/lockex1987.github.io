package annotation.anno;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Là @interface chứ không phải interface.
 * RetentionPolicy.RUNTIME thì khi thực thi sẽ nhận biết được sự tồn tại của annotation.
 * Annotation sẽ được gắn với field
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface FirstAnno {
    
    String name();
    
    long length() default 10;
}
