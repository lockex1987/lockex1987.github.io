package testmodel;

/**
 * Use generic
 *
 * @author locke
 * @param <T1>
 * @param <T2>
 */
public class Tuple<T1, T2> {

	public final T1 e1;
	public final T2 e2;

	public Tuple(T1 e1, T2 e2) {
		this.e1 = e1;
		this.e2 = e2;
	}
}
