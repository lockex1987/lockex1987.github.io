package com.viettel.safenet.logalert.model;

/**
 * Đối tượng chứa nhiều phần tử của các kiểu dữ liệu khác nhau.
 *
 * @author huyennv9
 * @param <T1> Kiểu dữ liệu của phần tử thứ nhất
 * @param <T2> Kiểu dữ liệu của phần tử thứ hai
 */
public class Tuple<T1, T2> {

    private final T1 e1;
    private final T2 e2;

    public Tuple(T1 i1, T2 i2) {
        this.e1 = i1;
        this.e2 = i2;
    }

    public T1 get1() {
        return e1;
    }

    public T2 get2() {
        return e2;
    }
}
