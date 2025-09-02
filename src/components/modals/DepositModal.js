import React from "react";

function DepositModal() {
  return (
    <div
      className="modal fade action-sheet"
      id="depositActionSheet"
      tabindex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Saldo</h5>
          </div>
          <div className="modal-body">
            <div className="action-sheet-content">
              <form>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" for="account1">
                      Kategori
                    </label>
                    <select
                      className="form-control custom-select"
                      id="category"
                    >
                      <option value="0">Gaji</option>
                    </select>
                  </div>
                </div>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" for="account1">
                      Dompet
                    </label>
                    <select
                      className="form-control custom-select"
                      id="account1"
                    >
                      <option value="0">Savings (*** 5019)</option>
                      <option value="1">Investment (*** 6212)</option>
                      <option value="2">Mortgage (*** 5021)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group basic">
                  <label className="label">Jumlah</label>
                  <div className="input-group mb-2">
                    <span className="input-group-text" id="basic-addona1">
                      Rp
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Jumlah"
                    />
                  </div>
                </div>

                <div className="form-group basic">
                  <button
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    data-bs-dismiss="modal"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;
