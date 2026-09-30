import loading from "../../../assets/panLoading.svg";

export default function Loading() {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
            <img
                src={loading}
                alt="Loading"
                width={160}
                height={160}
            />

            <p className="text-sm  text-gray-500">
                يتم الطبخ, من فضلك انتظر قليلا
            </p>
        </div>
    );
}